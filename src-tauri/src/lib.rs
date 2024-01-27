use tauri_plugin_updater::UpdaterExt;
use std::process::exit;

#[cfg_attr(mobile, tauri::mobile_entry_point)]

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                let updater = handle
                    .updater_builder()
                    .build()
                    .expect("failed to prepare updater");
                match updater.check().await {
                    Ok(Some(update)) => {
                        if let Err(e) = update.download_and_install(|_, _| {}, || {}).await {
                            println!("{e}");
                            exit(1);
                       }
                        exit(0);
                    }
                    Ok(None) => {
                        println!("your app is up to date");
                    }
                    Err(e) => {
                        println!("failed to check for updates: {}", e);
                    }
                }
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

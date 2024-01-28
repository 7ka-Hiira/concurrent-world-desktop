use tauri_plugin_updater::UpdaterExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            if let Ok(updater) = app.updater() {
                tauri::async_runtime::spawn(async move {
                    match updater.check().await {
                        Ok(Some(update)) => {
                            if let Err(e) = update.download_and_install(|_, _| {}, || {}).await {
                                println!("failed to download and install update: {}", e);
                            }
                        }
                        Ok(None) => {
                            println!("Up to date!");
                        }
                        Err(e) => {
                            println!("failed to check for updates: {}", e);
                        }
                    }
                });
            } else {
                println!("Updater disabled!");
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

use tauri_plugin_cli::CliExt;
use tauri_plugin_updater::UpdaterExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_cli::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(move |app| {
            if let Ok(cli_matches) = app.cli().matches() {
                if let Some(help_txt) = cli_matches.args.get("help") {
                    println!("{}", help_txt.value.as_str().unwrap());
                    std::process::exit(0);
                }
                if cli_matches.args.get("version").is_some() {
                    println!("{}", app.package_info().version);
                    std::process::exit(0);
                }
                if cli_matches
                    .args
                    .get("skip-update")
                    .and_then(|skip_update| skip_update.value.as_bool())
                    == Some(true)
                {
                    println!("Update skipped");
                    return Ok(());
                }
            } else {
                println!("Failed to parse arguments");
            }
            if let Ok(updater) = app.updater() {
                tauri::async_runtime::spawn(async move {
                    match updater.check().await {
                        Ok(Some(update)) => {
                            if let Err(e) = update.download_and_install(|_, _| {}, || {}).await {
                                println!("Failed to download and install update: {}", e);
                            }
                        }
                        Ok(None) => {
                            println!("Up to date!");
                        }
                        Err(e) => {
                            println!("Failed to check for updates: {}", e);
                        }
                    }
                });
            } else {
                println!("Failed to initialize updater");
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

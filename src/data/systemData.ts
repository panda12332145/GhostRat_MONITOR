export const systemConfig = {
  name: "GHOSTRAT",
  version: "2.4",
  engine_status: "ACTIVE",
  server: {
    version: "V3.4-CORE-HYDRA",
    uptime_days: 12,
    uptime_hours: 2,
    local_ip: "87.92.0.4444",
    encoding: "UTF-8",
    handshake: "VERIFIED",
    compression: "LZMA2",
    session_id: "D4E045",
    encryption: "AES-256-GCM"
  },
  resources: {
    cpu_usage: 12,
    ram_total_mb: 512,
    ram_used_mb: 350,
    cpu_percentage: 28,
    ram_percentage: 62
  },
  terminal_logs: [
    { timestamp: "[04:22:01]", message: "INITIALIZING HANDSHAKE WITH TARGET_82... 0x442A", type: "info" },
    { timestamp: "[04:22:00]", message: "BYPASSING WINDOWS DEFEND... SUCCESS", type: "success" },
    { timestamp: "[04:22:00]", message: "ESTABLISHING PERSISTENCE LAYER: SCHI-ASR5_V3", type: "info" },
    { timestamp: "[04:22:01]", message: "SYNCING SYSTEM METADATA...", type: "info" },
    { timestamp: "[04:22:01]", message: "READY FOR COMMAND_", type: "ready" }
  ],
  stats: {
    total_targets: 42,
    online_now: 18,
    active_payloads: 7,
    server_uptime: "12D 02H"
  }
};

export const alerts = [
  {
    id: "ALT-001",
    type: "NODE_DISCONNECTED",
    severity: "WARNING",
    title: "NODE_DISCONNECTED",
    message: "Target US-Desktop lost connection. Probable firewall update.",
    timestamp: "1M AGO",
    color: "#FF6B35",
    bgColor: "rgba(255, 107, 53, 0.1)",
    borderColor: "#FF6B35"
  },
  {
    id: "ALT-002",
    type: "NEW_INFILTRATION",
    severity: "INFO",
    title: "NEW_INFILTRATION",
    message: "Payload successfully deployed to node US-HOST-05.",
    timestamp: "3M AGO",
    color: "#00FFD4",
    bgColor: "rgba(0, 255, 212, 0.1)",
    borderColor: "#00FFD4"
  },
  {
    id: "ALT-003",
    type: "UPDATE_AVAILABLE",
    severity: "CRITICAL",
    title: "UPDATE_AVAIL",
    message: "Nexus Client v3.5 is now available for deployment.",
    timestamp: "5 MIN",
    color: "#FF0040",
    bgColor: "rgba(255, 0, 64, 0.1)",
    borderColor: "#FF0040"
  }
];

export const payloadTemplates = [
  { id: "TPL-001", name: "Reverse TCP Shell", description: "Direct Command-line access with full permission bypass.", type: "reverse_tcp" },
  { id: "TPL-002", name: "Silent Stealer", description: "Background data exfiltration module.", type: "stealer" },
  { id: "TPL-003", name: "Webcam Stream", description: "Real-time webcam capture and streaming.", type: "webcam" },
  { id: "TPL-004", name: "Keylogger Pro", description: "Advanced keystroke logging with screenshot capture.", type: "keylogger" },
  { id: "TPL-005", name: "Screen Capture", description: "Periodic screen capture with compression.", type: "screen_capture" }
];

export const deploymentHistory = [
  { build_id: "#FB-9921", type: "Silent Stealer", timestamp: "2023-11-24 14:15", size: "1.2 MB", status: "READY", action: "DOWNLOAD" },
  { build_id: "#FB-8842", type: "Reverse TCP", timestamp: "2023-11-24 14:02", size: "456 KB", status: "DEPLOYED", action: "DOWNLOAD" },
  { build_id: "#FB-8711", type: "Webcam Stream", timestamp: "2023-11-24 14:02", size: "2.1 MB", status: "READY", action: "DOWNLOAD" }
];

export const filesData = {
  active_target: {
    connection_id: "CONN-0004",
    device_name: "Desktop-Larrii",
    ip_address: "193.268.1.104",
    current_path: "C:\\Windows\\System32"
  },
  files: [
    { name: "drivers", type: "File Folder", size: null, date_modified: "2024-02-15 15:45", is_directory: true, permissions: "rwxr-xr-x" },
    { name: "oobe", type: "File Folder", size: null, date_modified: "2024-02-15 15:45", is_directory: true, permissions: "rwxr-xr-x" },
    { name: "kernel32.dll", type: "System Library", size: "1,245 KB", date_modified: "2024-02-15 15:45", is_directory: false, permissions: "r-xr-xr-x" },
    { name: "cmd.exe", type: "Application", size: "284 KB", date_modified: "2024-02-15 15:45", is_directory: false, permissions: "r-xr-xr-x" },
    { name: "hal.dll", type: "System Library", size: "512 KB", date_modified: "2024-02-15 15:45", is_directory: false, permissions: "r-xr-xr-x" },
    { name: "en-US", type: "File Folder", size: null, date_modified: "2024-02-15 15:45", is_directory: true, permissions: "rwxr-xr-x" },
    { name: "taskmgr.exe", type: "Application", size: "1.2 MB", date_modified: "2024-02-15 15:45", is_directory: false, permissions: "r-xr-xr-x" }
  ]
};

export interface Connection {
  id: string;
  device_name: string;
  username: string;
  hostname: string;
  ip_address: string;
  mac_address: string;
  os: string;
  os_version: string;
  architecture: string;
  status: 'ONLINE' | 'ERROR' | 'ANALYSIS' | 'BROKEN' | 'OFFLINE';
  status_code: number;
  last_seen: string;
  first_connection: string;
  session_id: string;
  geolocation: {
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    country: string;
    country_code: string;
    isp: string;
  };
  network_info: {
    connection_type: string;
    signal_strength: number | null;
    bandwidth: string;
    latency_ms: number;
    encryption: string;
    protocol: string;
    port: number;
    handshake_status: string;
    compression: string;
  };
  hardware_info: {
    cpu: string;
    ram_total: string;
    ram_available: string;
    storage_total: string;
    storage_available: string;
    battery_level: number | null;
    screen_resolution: string;
    camera_available: boolean;
    microphone_available: boolean;
  };
  capabilities: {
    files: boolean;
    screen: boolean;
    shell: boolean;
    camera: boolean;
    keylogger: boolean;
    audio: boolean;
    gps: boolean;
    contacts: boolean;
  };
  payload_info: {
    payload_id: string;
    payload_type: string;
    version: string;
    persistence: boolean;
    obfuscation_level: number;
  };
  tags: string[];
  notes: string;
  alert_level: string;
  data_exfiltrated_mb: number;
}

export const connectionsData: Connection[] = [
  {
    id: "CONN-0001",
    device_name: "Android - Moto G84",
    username: "carlos.silva",
    hostname: "moto-g84-carlos",
    ip_address: "172.26.2.14:8080",
    mac_address: "AA:BB:CC:DD:EE:F1",
    os: "Android 13",
    os_version: "13.0.2",
    architecture: "ARM64",
    status: "BROKEN",
    status_code: 200,
    last_seen: "2024-02-15T15:45:00Z",
    first_connection: "2024-01-10T08:30:00Z",
    session_id: "SES-8A3F2D",
    geolocation: { latitude: -23.5505, longitude: -46.6333, city: "São Paulo", state: "SP", country: "Brazil", country_code: "BR", isp: "Vivo Telecomunicações" },
    network_info: { connection_type: "WiFi", signal_strength: -45, bandwidth: "54 Mbps", latency_ms: 32, encryption: "AES-256-GCM", protocol: "TCP", port: 8080, handshake_status: "VERIFIED", compression: "LZMA2" },
    hardware_info: { cpu: "Snapdragon 680", ram_total: "4 GB", ram_available: "1.2 GB", storage_total: "128 GB", storage_available: "45 GB", battery_level: 72, screen_resolution: "1080x2400", camera_available: true, microphone_available: true },
    capabilities: { files: true, screen: true, shell: true, camera: true, keylogger: false, audio: true, gps: true, contacts: true },
    payload_info: { payload_id: "#FB-9921", payload_type: "Silent Stealer", version: "2.4", persistence: true, obfuscation_level: 85 },
    tags: ["mobile", "android", "south-america"],
    notes: "Device belongs to target Carlos Silva. Stable connection.",
    alert_level: "LOW",
    data_exfiltrated_mb: 156.7
  },
  {
    id: "CONN-0002",
    device_name: "Android - S24",
    username: "user.s24",
    hostname: "galaxy-s24",
    ip_address: "10.0.0.42",
    mac_address: "DD:EE:FF:11:22:33",
    os: "Android 13",
    os_version: "13.0.1",
    architecture: "ARM64",
    status: "ANALYSIS",
    status_code: 102,
    last_seen: "2024-02-15T15:40:00Z",
    first_connection: "2024-02-14T22:10:00Z",
    session_id: "SES-9C2D4F",
    geolocation: { latitude: -3.1190, longitude: -60.0217, city: "Manaus", state: "AM", country: "Brazil", country_code: "BR", isp: "TIM Brasil" },
    network_info: { connection_type: "4G LTE", signal_strength: -58, bandwidth: "30 Mbps", latency_ms: 65, encryption: "AES-256-GCM", protocol: "TCP", port: 8080, handshake_status: "PENDING", compression: "LZMA2" },
    hardware_info: { cpu: "Exynos 2400", ram_total: "8 GB", ram_available: "3.5 GB", storage_total: "256 GB", storage_available: "120 GB", battery_level: 45, screen_resolution: "1440x3120", camera_available: true, microphone_available: true },
    capabilities: { files: true, screen: true, shell: true, camera: true, keylogger: false, audio: true, gps: true, contacts: true },
    payload_info: { payload_id: "#FB-9955", payload_type: "Silent Stealer", version: "2.4", persistence: true, obfuscation_level: 90 },
    tags: ["mobile", "android", "new"],
    notes: "Recently deployed. Under analysis.",
    alert_level: "MEDIUM",
    data_exfiltrated_mb: 3.2
  },
  {
    id: "CONN-0003",
    device_name: "Android - Asus ROG Phone 7",
    username: "gamer.rog",
    hostname: "asus-rog7",
    ip_address: "192.168.1.104",
    mac_address: "FF:EE:DD:CC:BB:AA",
    os: "Android 14",
    os_version: "14.0.0",
    architecture: "ARM64",
    status: "ONLINE",
    status_code: 200,
    last_seen: "2024-02-15T15:45:00Z",
    first_connection: "2024-01-28T19:30:00Z",
    session_id: "SES-2E4F6G",
    geolocation: { latitude: -19.9191, longitude: -43.9386, city: "Belo Horizonte", state: "MG", country: "Brazil", country_code: "BR", isp: "Vivo Fibra" },
    network_info: { connection_type: "WiFi 6", signal_strength: -35, bandwidth: "100 Mbps", latency_ms: 18, encryption: "AES-256-GCM", protocol: "TCP", port: 4444, handshake_status: "VERIFIED", compression: "LZMA2" },
    hardware_info: { cpu: "Snapdragon 8 Gen 2", ram_total: "16 GB", ram_available: "8.2 GB", storage_total: "512 GB", storage_available: "280 GB", battery_level: 88, screen_resolution: "1080x2448", camera_available: true, microphone_available: true },
    capabilities: { files: true, screen: true, shell: true, camera: true, keylogger: false, audio: true, gps: true, contacts: true },
    payload_info: { payload_id: "#FB-9921", payload_type: "Silent Stealer", version: "2.4", persistence: true, obfuscation_level: 85 },
    tags: ["mobile", "android", "gaming"],
    notes: "Gaming device. High performance.",
    alert_level: "NONE",
    data_exfiltrated_mb: 67.8
  },
  {
    id: "CONN-0004",
    device_name: "Desktop-Larrii",
    username: "larrii.admin",
    hostname: "DESKTOP-LARRII",
    ip_address: "193.268.1.104",
    mac_address: "11:22:33:44:55:66",
    os: "Windows 10 Pro",
    os_version: "10.0.19045",
    architecture: "x86_64",
    status: "ONLINE",
    status_code: 200,
    last_seen: "2024-02-15T15:45:00Z",
    first_connection: "2023-12-05T14:20:00Z",
    session_id: "SES-4B5E1A",
    geolocation: { latitude: -22.9068, longitude: -43.1729, city: "Rio de Janeiro", state: "RJ", country: "Brazil", country_code: "BR", isp: "Claro NET" },
    network_info: { connection_type: "Ethernet", signal_strength: null, bandwidth: "200 Mbps", latency_ms: 12, encryption: "AES-256-GCM", protocol: "TCP", port: 4444, handshake_status: "VERIFIED", compression: "LZMA2" },
    hardware_info: { cpu: "Intel i7-12700K", ram_total: "16 GB", ram_available: "6.1 GB", storage_total: "512 GB", storage_available: "180 GB", battery_level: null, screen_resolution: "1920x1080", camera_available: true, microphone_available: true },
    capabilities: { files: true, screen: true, shell: true, camera: true, keylogger: true, audio: true, gps: false, contacts: false },
    payload_info: { payload_id: "#FB-8842", payload_type: "Reverse TCP", version: "3.1", persistence: true, obfuscation_level: 85 },
    tags: ["desktop", "windows", "admin-access"],
    notes: "Full admin access. File manager active.",
    alert_level: "NONE",
    data_exfiltrated_mb: 432.1
  },
  {
    id: "CONN-0005",
    device_name: "Dev-Debian-03",
    username: "dev.admin",
    hostname: "dev-debian-03",
    ip_address: "192.168.5.120:3000",
    mac_address: "44:55:66:77:88:99",
    os: "Debian 12 Bookworm",
    os_version: "12.4",
    architecture: "x86_64",
    status: "ONLINE",
    status_code: 200,
    last_seen: "2024-02-15T15:44:00Z",
    first_connection: "2023-11-20T10:00:00Z",
    session_id: "SES-7A1B3C",
    geolocation: { latitude: -25.4284, longitude: -49.2733, city: "Curitiba", state: "PR", country: "Brazil", country_code: "BR", isp: "Copel Telecom" },
    network_info: { connection_type: "Ethernet", signal_strength: null, bandwidth: "1 Gbps", latency_ms: 5, encryption: "AES-256-GCM", protocol: "TCP", port: 3000, handshake_status: "VERIFIED", compression: "LZMA2" },
    hardware_info: { cpu: "Intel Xeon E5-2680", ram_total: "32 GB", ram_available: "18 GB", storage_total: "1 TB", storage_available: "650 GB", battery_level: null, screen_resolution: "headless", camera_available: false, microphone_available: false },
    capabilities: { files: true, screen: true, shell: true, camera: false, keylogger: true, audio: false, gps: false, contacts: false },
    payload_info: { payload_id: "#FB-6631", payload_type: "Reverse TCP", version: "3.1", persistence: true, obfuscation_level: 75 },
    tags: ["server", "linux", "developer"],
    notes: "Development server. High bandwidth.",
    alert_level: "NONE",
    data_exfiltrated_mb: 892.5
  },
  {
    id: "CONN-0006",
    device_name: "Desktop-Kl12",
    username: "unknown",
    hostname: "DESKTOP-KL12",
    ip_address: "192.288.2.404",
    mac_address: "77:88:99:AA:BB:CC",
    os: "Windows 10",
    os_version: "10.0.19044",
    architecture: "x86_64",
    status: "ERROR",
    status_code: 503,
    last_seen: "2024-02-15T14:30:00Z",
    first_connection: "2024-02-01T09:15:00Z",
    session_id: "SES-ERROR",
    geolocation: { latitude: -15.7975, longitude: -47.8919, city: "Brasília", state: "DF", country: "Brazil", country_code: "BR", isp: "OI Telecom" },
    network_info: { connection_type: "WiFi", signal_strength: -72, bandwidth: "25 Mbps", latency_ms: 180, encryption: "AES-256-GCM", protocol: "TCP", port: 4444, handshake_status: "FAILED", compression: "LZMA2" },
    hardware_info: { cpu: "AMD Ryzen 5 5600X", ram_total: "8 GB", ram_available: "2.3 GB", storage_total: "256 GB", storage_available: "34 GB", battery_level: null, screen_resolution: "1920x1080", camera_available: false, microphone_available: true },
    capabilities: { files: true, screen: true, shell: true, camera: false, keylogger: false, audio: true, gps: false, contacts: false },
    payload_info: { payload_id: "#FB-7721", payload_type: "Reverse TCP", version: "2.4", persistence: false, obfuscation_level: 60 },
    tags: ["desktop", "windows", "unstable"],
    notes: "Connection dropping frequently. Possible firewall.",
    alert_level: "HIGH",
    data_exfiltrated_mb: 12.3
  },
  {
    id: "CONN-0007",
    device_name: "Prod-CentOS-02",
    username: "sysadmin",
    hostname: "prod-centos-02",
    ip_address: "10.45.23.78:9090",
    mac_address: "AA:11:BB:22:CC:33",
    os: "CentOS Stream 9",
    os_version: "9.3",
    architecture: "x86_64",
    status: "BROKEN",
    status_code: 502,
    last_seen: "2024-02-14T23:12:00Z",
    first_connection: "2023-10-15T16:45:00Z",
    session_id: "SES-BROKEN",
    geolocation: { latitude: -12.9714, longitude: -38.5014, city: "Salvador", state: "BA", country: "Brazil", country_code: "BR", isp: "Algar Telecom" },
    network_info: { connection_type: "Ethernet", signal_strength: null, bandwidth: "500 Mbps", latency_ms: 999, encryption: "AES-256-GCM", protocol: "TCP", port: 9090, handshake_status: "TIMEOUT", compression: "LZMA2" },
    hardware_info: { cpu: "AMD EPYC 7542", ram_total: "64 GB", ram_available: "0 GB", storage_total: "2 TB", storage_available: "400 GB", battery_level: null, screen_resolution: "headless", camera_available: false, microphone_available: false },
    capabilities: { files: true, screen: true, shell: true, camera: false, keylogger: false, audio: false, gps: false, contacts: false },
    payload_info: { payload_id: "#FB-5521", payload_type: "Reverse TCP", version: "2.4", persistence: true, obfuscation_level: 50 },
    tags: ["server", "linux", "production", "down"],
    notes: "Connection lost. Probable firewall update.",
    alert_level: "CRITICAL",
    data_exfiltrated_mb: 1240.0
  },
  {
    id: "CONN-0008",
    device_name: "prod-web-Ubuntu-01",
    username: "webadmin",
    hostname: "prod-web-ubuntu-01",
    ip_address: "168.138.1.100:80",
    mac_address: "67:89:AB:CD:EF:01",
    os: "Ubuntu 22.04.1 LTS",
    os_version: "22.04.1",
    architecture: "x86_64",
    status: "ONLINE",
    status_code: 200,
    last_seen: "2024-02-15T15:45:00Z",
    first_connection: "2023-09-01T00:00:00Z",
    session_id: "SES-P3Q5R7",
    geolocation: { latitude: -16.6869, longitude: -49.2648, city: "Goiânia", state: "GO", country: "Brazil", country_code: "BR", isp: "Amazon AWS" },
    network_info: { connection_type: "Ethernet", signal_strength: null, bandwidth: "10 Gbps", latency_ms: 3, encryption: "AES-256-GCM", protocol: "TCP", port: 80, handshake_status: "VERIFIED", compression: "LZMA2" },
    hardware_info: { cpu: "AMD EPYC 7R13", ram_total: "128 GB", ram_available: "72 GB", storage_total: "4 TB", storage_available: "2.8 TB", battery_level: null, screen_resolution: "headless", camera_available: false, microphone_available: false },
    capabilities: { files: true, screen: false, shell: true, camera: false, keylogger: true, audio: false, gps: false, contacts: false },
    payload_info: { payload_id: "#FB-4455", payload_type: "Web Shell", version: "4.0", persistence: true, obfuscation_level: 70 },
    tags: ["server", "linux", "production", "web"],
    notes: "Production web server on AWS. Critical asset.",
    alert_level: "NONE",
    data_exfiltrated_mb: 3200.0
  },
  {
    id: "CONN-0009",
    device_name: "Iphone-X Pro Max",
    username: "iphone.user",
    hostname: "iPhone-X-ProMax",
    ip_address: "177.45.123.78",
    mac_address: "12:34:56:78:9A:BC",
    os: "iOS 11",
    os_version: "11.4.1",
    architecture: "ARM64",
    status: "ERROR",
    status_code: 408,
    last_seen: "2024-02-15T13:20:00Z",
    first_connection: "2024-02-10T11:00:00Z",
    session_id: "SES-TIMEOUT",
    geolocation: { latitude: -8.0476, longitude: -34.8770, city: "Recife", state: "PE", country: "Brazil", country_code: "BR", isp: "NET Claro" },
    network_info: { connection_type: "4G", signal_strength: -80, bandwidth: "15 Mbps", latency_ms: 250, encryption: "AES-256-GCM", protocol: "TCP", port: 4444, handshake_status: "EXPIRED", compression: "LZMA2" },
    hardware_info: { cpu: "A11 Bionic", ram_total: "3 GB", ram_available: "0.8 GB", storage_total: "256 GB", storage_available: "12 GB", battery_level: 15, screen_resolution: "1242x2688", camera_available: true, microphone_available: true },
    capabilities: { files: true, screen: true, shell: true, camera: true, keylogger: false, audio: true, gps: true, contacts: true },
    payload_info: { payload_id: "#FB-1122", payload_type: "iOS Exploit", version: "1.2", persistence: false, obfuscation_level: 95 },
    tags: ["mobile", "ios", "unstable"],
    notes: "iOS device. Connection timeout frequently.",
    alert_level: "HIGH",
    data_exfiltrated_mb: 8.1
  },
  {
    id: "CONN-0010",
    device_name: "Staging-Fedora-01",
    username: "staging.ops",
    hostname: "staging-fedora-01",
    ip_address: "172.31.0.45:8443",
    mac_address: "DE:AD:BE:EF:CA:FE",
    os: "Fedora 38",
    os_version: "38.1",
    architecture: "x86_64",
    status: "ANALYSIS",
    status_code: 102,
    last_seen: "2024-02-15T15:43:00Z",
    first_connection: "2024-02-12T07:00:00Z",
    session_id: "SES-5H7J9K",
    geolocation: { latitude: -30.0346, longitude: -51.2177, city: "Porto Alegre", state: "RS", country: "Brazil", country_code: "BR", isp: "GVT Telefônica" },
    network_info: { connection_type: "Ethernet", signal_strength: null, bandwidth: "300 Mbps", latency_ms: 22, encryption: "AES-256-GCM", protocol: "TCP", port: 8443, handshake_status: "VERIFIED", compression: "LZMA2" },
    hardware_info: { cpu: "Intel i5-13400", ram_total: "16 GB", ram_available: "9 GB", storage_total: "500 GB", storage_available: "320 GB", battery_level: null, screen_resolution: "2560x1440", camera_available: true, microphone_available: true },
    capabilities: { files: true, screen: true, shell: true, camera: true, keylogger: true, audio: true, gps: false, contacts: false },
    payload_info: { payload_id: "#FB-3344", payload_type: "Reverse TCP", version: "3.1", persistence: true, obfuscation_level: 80 },
    tags: ["server", "linux", "staging"],
    notes: "Staging environment. Under analysis for lateral movement.",
    alert_level: "MEDIUM",
    data_exfiltrated_mb: 45.2
  },
  {
    id: "CONN-0011",
    device_name: "Desktop-XJ29",
    username: "xj29.user",
    hostname: "DESKTOP-XJ29",
    ip_address: "192.168.1.104",
    mac_address: "AB:CD:EF:01:23:45",
    os: "Windows 11 Pro",
    os_version: "11.0.22631",
    architecture: "x86_64",
    status: "ANALYSIS",
    status_code: 102,
    last_seen: "2024-02-15T15:42:00Z",
    first_connection: "2024-02-13T16:30:00Z",
    session_id: "SES-L2M4N6",
    geolocation: { latitude: -2.5019, longitude: -44.2825, city: "São Luís", state: "MA", country: "Brazil", country_code: "BR", isp: "Equatorial Telecom" },
    network_info: { connection_type: "WiFi", signal_strength: -52, bandwidth: "50 Mbps", latency_ms: 45, encryption: "AES-256-GCM", protocol: "TCP", port: 4444, handshake_status: "VERIFIED", compression: "LZMA2" },
    hardware_info: { cpu: "Intel i9-13900K", ram_total: "32 GB", ram_available: "14 GB", storage_total: "2 TB", storage_available: "1.2 TB", battery_level: null, screen_resolution: "3840x2160", camera_available: true, microphone_available: true },
    capabilities: { files: true, screen: true, shell: true, camera: true, keylogger: true, audio: true, gps: false, contacts: false },
    payload_info: { payload_id: "#FB-8842", payload_type: "Reverse TCP", version: "3.1", persistence: true, obfuscation_level: 85 },
    tags: ["desktop", "windows", "high-end"],
    notes: "High-end desktop. Analysis in progress.",
    alert_level: "MEDIUM",
    data_exfiltrated_mb: 22.4
  }
];

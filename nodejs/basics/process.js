const process_values = {
    version: process.version, // node version
    arch: process.arch, // processor architecture
    platform: process.platform, // os platform
    pid: process.pid, //current process id
    uptime: process.uptime(), // duration after process start (second)
    execPath: process.execPath, // node path
    cwd: process.cwd(), // current path where process executed
    cpuUsage: process.cpuUsage(), // current cpu usage
    env: process.env, // system env variables
}
for (const [key, value] of Object.entries(process_values)) {
    console.log(key, value);
}

// process exit
process.exit(); // 인수가 없거나 0이면 정상종료, 1이면 비정상 종료

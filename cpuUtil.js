const osu = require("node-os-utils");
const cpu = osu.cpu;
const drive = osu.drive;
const memory = osu.mem;
const osCmd = osu.osCmd;

module.exports = async () => {
  const cpuPercentage = await cpu.usage();
  console.log("cpuPercentage :", cpuPercentage);

  const userName = await osCmd.whoami();
  console.log("User name :", userName);

  const cpuAverageInfo = cpu.average();
  console.log("cpuAverageInfo :", cpuAverageInfo);

  const freeCpu = await cpu.free();
  console.log("cpu free info :", freeCpu);

  const driveInfo = await drive.info();
  console.log("drive info :", driveInfo);

  const memoryInfo = await memory.info();
  console.log("memory info :", memoryInfo);

  return {
    cpuPercentage,
    userName,
    cpuAverageInfo,
    freeCpu,
    driveInfo,
    memoryInfo,
  };
};

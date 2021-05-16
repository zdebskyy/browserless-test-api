const osu = require("node-os-utils");
const cpu = osu.cpu;
const count = cpu.count(); // 8

cpu.usage().then((cpuPercentage) => {
  console.log("cpuPercentage :", cpuPercentage); // 10.38
});

const osCmd = osu.osCmd;

osCmd.whoami().then((userName) => {
  console.log("userName :", userName); // admin
});

const info = cpu.average();

console.log("info :", info);

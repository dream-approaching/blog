---
title: OD机试
group:
  title: Interview
---

## OD 机试

### 打卡

考勤记录是分析和考核职工工作时间利用情况的原始依据，也是计算职工工资的原始依据，为了正确地计算职工工资和监督工资基金使用情况，公司决定对员工的手机打卡记录进行异常排查。如果出现以下两种情况，则认为打卡异常： 1、实际设备号与注册设备号不一样 2、或者，同一个员工的两个打卡记录的时间小于 60 分钟并且打卡距离超过 5km。给定打卡记录的字符串数组 clockRecords（每个打卡记录组成为：工号;时间（分钟）;打卡距离（km）;实际设备号;注册设备号），返回其中异常的打卡记录（按输入顺序输出）。

输入描述：第一行输入为 N，表示打卡记录数；之后的 N 行为打卡记录，每一行为一条打卡记录。例如： 2 100000,10,1,ABCD,ABCD 100000,50,10,ABCD,ABCD

输出描述：输出为异常的打卡记录，例如：100000,10,1,ABCD,ABCD;100000,50,10,ABCD,ABCD

示例 1：

输入： 2 100000,10,1,ABCD,ABCD 100000,50,10,ABCD,ABCD

输出： 100000,10,1,ABCD,ABCD;100000,50,10,ABCD,ABCD

说明：第一条记录是异常的，因为第二条记录与它的间隔不超过 60 分钟但是打卡距离超过了 5km，同理第二条记录也是异常的。

示例 2：

输入： 2 100000,10,1,ABCD,ABCD 100000,80,10,ABCE,ABCD

输出： 100000,80,10,ABCE,ABCD

说明：第一条记录是异常的，因为实际设备号与注册设备号不一样，同理第二条记录也是异常的。

代码

```js
var readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,

  output: process.stdout,
});

var n = -1; // 初始状态为负数，表示还没开始读取
var ansString = '';
var lineArr = []; // 用于保存每一行的数据
var cur_line = 0;
const everyManRecord = {}; // 用于保存每个人的打卡记录

rl.on('line', function (line) {
  // 读取行数
  if (n === -1) {
    n = parseInt(line.trim());
  } else {
    // 读取每一行
    cur_line++;
    var arr = line.split(',');
    var id = parseInt(arr[0]); // 工号
    var time = parseInt(arr[1]); // 时间
    var distance = parseInt(arr[2]); // 距离
    var actualDevice = arr[3]; // 实际设备号
    var registerDevice = arr[4]; // 注册设备号

    // 保存每一行的数据
    lineArr.push(line);

    // 如果实际设备号与注册设备号不一样，或者时间间隔小于 60 分钟并且距离超过 5km
    if (actualDevice !== registerDevice) {
      ansString += line + ';';
    } else if (cur_line > 1) {
      // 如果当前行大于1，说明有上一行

      var preArr = lineArr[cur_line - 2].split(',');
      var preId = parseInt(preArr[0]);
      var preTime = parseInt(preArr[1]);
      var preDistance = parseInt(preArr[2]);
      var preActualDevice = preArr[3];
      var preRegisterDevice = preArr[4];

      // 记录当前行的工号
      //   everyManRecord[id] = everyManRecord[id] ? everyManRecord[id].concat([line]) : [line];

      // 如果当前行的工号和上一行的工号不同，则说明是另一个员工的记录了，跳过本次循环
      //   if (everyManRecord[id].length > 1) {
      if (time - preTime < 60 && distance - preDistance > 5) {
        // 也要输出上一行
        ansString += lineArr[cur_line - 2] + ';';
        ansString += line + ';';
      }
      //   }
    }
    if (cur_line === n) {
      // 如果不存在的话输出null
      console.log(ansString ? ansString.slice(0, -1) : 'null');
    }
  }
});
```

### 积木

小华和小薇一起通过玩积木游戏学习数学。他们有很多积木，每个积木块上都有一个数字，积木块上的数字可能相同。小华随机拿一些积木挨着排成一排，请小薇找到这排积木中数字相同且所处位置最远的 2 块积木块，计算他们的距离。小薇请你帮忙替解决这个问题。

输入描述：  
第一行输入为 N，表示小华排成一排的积木总数。

接下来 N 行每行一个数字，表示小华排成一排的积木上数字。

输出描述：  
相同数字的积木的位置最远距离；如果所有积木数字都不相同，请返回-1.

示例 1

输入： 5 1 2 3 1 4  
输出： 3  
说明：第一行输入为 5，表示小华排成一排的积木总数。接下来 5 行每行一个数字，表示小华排成一排的积木上数字。相同数字的积木的位置最远距离为 3，即第 4 个积木和第 1 个积木的距离。

示例 2

输入：2 1 2  
输出：-1  
说明：第一行输入为 2，表示小华排成一排的积木总数。接下来 2 行每行一个数字，表示小华排成一排的积木上数字。所有积木数字都不相同，所以返回 -1。

代码

```js
var readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var n = -1; // 初始状态为负数，表示还没开始读取
var ans = -1; // 初始状态为-1，表示不存在
var cur_line = 0; // 当前行数
var map = new Map(); // 用于保存每个数字出现的位置

rl.on('line', function (line) {
  // 读取行数
  if (n === -1) {
    n = parseInt(line.trim());
  } else {
    // 读取每一行
    cur_line++;
    var num = parseInt(line.trim());

    // 如果map中存在这个数字，说明之前已经出现过了
    if (map.has(num)) {
      // 保存最大的距离
      ans = Math.max(ans, cur_line - map.get(num));
    } else {
      // 如果不存在，就保存这个数字出现的位置
      map.set(num, cur_line);
    }

    if (cur_line === n) {
      // 如果不存在的话输出null
      console.log(ans);
    }
  }
});
```

### 狼养过河

一只农夫带着 m 只羊和 n 只狼过河，农夫有一条可载 x 只狼/羊的船。农夫在时，或者羊的数量大于狼时，狼不会攻击羊；农夫在不损失羊的情况下，运输几次可以完成运输？(返程不计入次数)

输入描述：

输入为一行，包含三个整数 m,n,x，用空格分隔，m 为羊的数量，n 为狼的数量，x 为可载狼和羊的数量。

输出描述：

输出为一行，包含一个整数，表示最少运输次数。

示例 1

输入： 5 3 3  
输出： 3  
说明：第一次 2 只狼，第二次 3 只羊，第三次 1 只狼 2 只羊

思路： if(农夫在) { 狼不会攻击羊 } else { if (羊 > 狼) { 狼不会攻击羊 } else { 狼会攻击羊 } }

代码

```js
var readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var n = -1; // 初始状态为负数，表示还没开始读取
var ans = 0; // 表示需要运输的次数，初始为0
var cur_line = 0; // 当前行数
var map = new Map(); // 用于保存已经运输过的狼和羊的数量

rl.on('line', function (line) {
  var arr = line.trim().split(' ');
  var allSheep = parseInt(arr[0]); // 羊的数量
  var allWolf = parseInt(arr[1]); // 狼的数量
  var maxCount = parseInt(arr[2]); // 可载狼和羊的数量

  // 递归运输
  wolfAndSheep(allSheep, allWolf);

  function wolfAndSheep(sheep, wolf) {
    // 如果狼和羊的数量都为0，说明已经运输完了，输出运输次数
    if (sheep <= 0 && wolf <= 0) {
      console.log(ans);
    } else {
      // 如果狼和羊的数量都不为0，说明还没有运输完，需要运输
      ans++;

      // 如果狼的数量大于羊的数量，说明狼会攻击羊
      if (wolf > sheep) {
        // 如果狼的数量大于可载狼和羊的数量，说明狼的数量会减少
        if (wolf > maxCount) {
          wolf -= maxCount;
        } else {
          // 有剩余的空位，就把剩余的空位给羊
          sheep -= Math.max(maxCount - wolf, 0);
          // 如果狼的数量小于可载狼和羊的数量，说明狼的数量会变为0
          wolf = 0;
        }
      } else {
        // 如果狼的数量小于羊的数量，说明狼不会攻击羊
        // 如果羊的数量大于可载狼和羊的数量，说明羊的数量会减少
        if (sheep > maxCount) {
          sheep -= maxCount;
        } else {
          // 有剩余的空位，就把剩余的空位给狼
          wolf -= Math.max(maxCount - sheep, 0);
          // 如果羊的数量小于可载狼和羊的数量，说明羊的数量会变为0
          sheep = 0;
        }
      }

      // 如果已经运输过的狼和羊的数量中已经存在这个数量，说明已经运输过了，直接输出0
      if (map.has(sheep + '-' + wolf)) {
        return 0;
      } else {
        // 如果不存在，就保存这个数量
        map.set(sheep + '-' + wolf, true);
      }

      // 递归运输
      return wolfAndSheep(sheep, wolf);
    }
  }
});
```

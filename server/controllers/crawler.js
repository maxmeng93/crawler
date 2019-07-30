const fs = require('fs');
const path = require('path');
const request = require('request-promise');
const cheerio = require('cheerio');

module.exports = {
  async getChinaPopulation(ctx) {
    const fileUrl = path.join(__dirname, '../../data', 'chinaPopulation.json');
    const file = await fs.readFileSync(fileUrl);
    if (file) {
      ctx.body = file.toString();
      return;
    }

    // const userAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36";
    let data = {};
    // 提取小括号中的内容
    var reg = /\(([^)]*)\)/;

    // 中国历年人口总数统计
    await request({
      url: 'https://www.kuaiyilicai.com/stats/global/yearly_per_country/g_population_total/chn.html',
    }).then(body => {
      let $ = cheerio.load(body);
      let tr = $('table.table tbody tr');

      for (let i = 0; i < tr.length; i++) {
        const year = tr.eq(i).find('td').eq(0).text().replace(/(\s*$)/g, '');
        if (year) {
          const total = tr.eq(i).find('td').eq(1).text().match(reg)[1].replace(/,/g, '');
          data[parseInt(year)] = Object.assign(
            {},
            data[parseInt(year)] ? data[parseInt(year)] : {},
            { total }
          );
        }
      }
    });

    // 中国历年男性占总人口比重
    await request({
      url: 'https://www.kuaiyilicai.com/stats/global/yearly_per_country/g_population_male/chn.html'
    }).then(body => {
      let $ = cheerio.load(body);
      let tr = $('table.table tbody tr');

      for (let i = 0; i < tr.length; i++) {
        const year = tr.eq(i).find('td').eq(0).text().replace(/(\s*$)/g, '');
        if (year) {
          const male = tr.eq(i).find('td').eq(1).text().match(reg)[1].replace(/,/g, '');
          const female = data[parseInt(year)].total - male + '';
          data[parseInt(year)] = Object.assign(
            {},
            data[parseInt(year)] ? data[parseInt(year)] : {},
            { male, female }
          );
        }
      }
    });

    let arr = [];
    for (let year in data) {
      let obj = Object.assign({ year }, data[year]);
      arr.push(obj)
    }

    fs.writeFile(fileUrl, JSON.stringify(arr, null, 2), 'utf-8', err => {
      if(!err) {
        console.log("文件生成成功");
      }
    });

    ctx.body = arr;
  }
};

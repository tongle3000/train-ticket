
const express = require('express');
const app = express();
const data = require('./json/query.json');
const data1 = require('./json/query2020-09-27.json');
const data2 = require('./json/query2020-09-28.json');
const data3 = require('./json/query2020-09-29.json');
const citys = require('./json/citys.json');

app.get('/', (request, response) => {
    response.status(200);
    response.send('hello express');
    response.end();
});

app.get('/rest', (request, response) => {
    response.json({
        result:1,
        msg: 'hello express'
    })
})

app.get('/rest/citys', (request, response) => {
  response.json(citys)
})
app.get('/rest/query', (request, response) => {
  response.json(data)
})

app.get('/rest/query2020-09-27', (request, response) => {
  response.json(data1)
})
app.get('/rest/query2020-09-28', (request, response) => {
  response.json(data2)
})
app.get('/rest/query2020-09-29', (request, response) => {
  response.json(data3)
})



app.get('/rest/cities', (request, response) => {
    response.json({
        "hotCities": [
          {
            "name": "北京"
          },
          {
            "name": "上海"
          },
          {
            "name": "深圳"
          },
          {
            "name": "杭州"
          },
          {
            "name": "广州"
          },
          {
            "name": "南京"
          },
          {
            "name": "香港"
          }
        ],
        "cityList": [
          {
            "citys": [
              {
                "name": "安顺"
              },
              {
                "name": "安溪"
              },
              {
                "name": "安辽"
              }
            ],
            "title": "A"
          },
          {
            "citys": [
              {
                "name": "宜昌"
              },
              {
                "name": "盐城"
              },
              {
                "name": " 宜春"
              }
            ],
            "title": "B"
          },
          {
            "citys": [
              {
                "name": "长沙"
              },
              {
                "name": "常山"
              },
              {
                "name": "长春"
              }
            ],
            "title": "C"
          },
          {
            "citys": [
              {
                "name": "东旭"
              },
              {
                "name": "东京"
              },
              {
                "name": "东城"
              }
            ],
            "title": "D"
          },
          {
            "citys": [
              {
                "name": "鄂尔多斯"
              },
              {
                "name": "鳄梨"
              }
            ],
            "title": "E"
          },
          {
            "citys": [
              {
                "name": "福州"
              },
              {
                "name": "佛山"
              },
              {
                "name": "福鼎"
              }
            ],
            "title": "F"
          },
          {
            "citys": [
              {
                "name": "广州"
              },
              {
                "name": "贵阳"
              },
              {
                "name": "桂林"
              }
            ],
            "title": "G"
          },
          {
            "citys": [
              {
                "name": "杭州"
              },
              {
                "name": "哈尔滨"
              },
              {
                "name": "合肥"
              }
            ],
            "title": "H"
          },
          {
            "title": "I"
          },
          {
            "citys": [
              {
                "name": "景德镇"
              },
              {
                "name": "吉安"
              },
              {
                "name": "济南"
              }
            ],
            "title": "J"
          },
          {
            "citys": [
              {
                "name": "昆明"
              },
              {
                "name": "开封"
              },
              {
                "name": "昆山"
              }
            ],
            "title": "K"
          },
          {
            "citys": [
              {
                "name": "拉萨"
              },
              {
                "name": "兰州"
              },
              {
                "name": "临川"
              }
            ],
            "title": "L"
          },
          {
            "citys": [
              {
                "name": "麻城"
              },
              {
                "name": "牡丹江"
              },
              {
                "name": "马尾"
              }
            ],
            "title": "M"
          },
          {
            "citys": [
              {
                "name": "南昌"
              },
              {
                "name": "南京"
              },
              {
                "name": "南宁"
              }
            ],
            "title": "N"
          },
          {
            "citys": [
              {
                "name": "平顶山"
              },
              {
                "name": "萍乡"
              },
              {
                "name": "盘锦"
              }
            ],
            "title": "P"
          },
          {
            "citys": [
              {
                "name": "青岛"
              },
              {
                "name": "泉州"
              },
              {
                "name": "齐齐哈尔"
              }
            ],
            "title": "Q"
          },
          {
            "citys": [
              {
                "name": "瑞安"
              },
              {
                "name": "瑞京"
              },
              {
                "name": "瑞昌"
              }
            ],
            "title": "R"
          },
          {
            "citys": [
              {
                "name": "上海"
              },
              {
                "name": "沈阳"
              },
              {
                "name": "石家庄"
              }
            ],
            "title": "S"
          },
          {
            "citys": [
              {
                "name": "天津"
              },
              {
                "name": "太原"
              },
              {
                "name": "塘沽"
              }
            ],
            "title": "T"
          },
          {
            "title": "U"
          },
          {
            "title": "V"
          },
          {
            "citys": [
              {
                "name": "武汉"
              },
              {
                "name": "武昌"
              },
              {
                "name": "五常"
              }
            ],
            "title": "W"
          },
          {
            "citys": [
              {
                "name": "西安"
              },
              {
                "name": "许昌"
              },
              {
                "name": "厦门"
              }
            ],
            "title": "X"
          },
          {
            "citys": [
              {
                "name": "宜昌"
              },
              {
                "name": "盐城"
              },
              {
                "name": " 宜春"
              }
            ],
            "title": "Y"
          },
          {
            "citys": [
              {
                "name": "株洲"
              },
              {
                "name": "镇江"
              },
              {
                "name": "珠海"
              }
            ],
            "title": "Z"
          }
        ],
        "version": 34665
      })
})



app.get('/rest/search', (request, response) => {
    response.json({
        "data":[
            {
                "key": "a",
                "result": [
                    {
                    "display": "安顺"
                    },
                    {
                    "display": "安溪"
                    },
                    {
                    "display": "安辽"
                    }
                ]
            },
            {
                "key": "b",
                "result": [
                    {
                    "display": "北京"
                    },
                    {
                    "display": "北仑"
                    },
                    {
                    "display": "北山"
                    }
                ]
            }
        ]
    })
})







app.listen(4000);

console.log('aaaaa')


// var express = require('express')
// var app = express()

// app.get('/', function (req, res) {
//   res.send('hello world')
// })

// app.listen(3000)
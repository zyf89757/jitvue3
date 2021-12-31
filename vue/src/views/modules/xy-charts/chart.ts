import Highcahrts from 'highcharts';
import { any } from 'vue-types';

Highcahrts.theme = {
  colors:
    '#7cb5ec #f7a35c #90ee7e #7798BF #aaeeee #ff0066 #eeaaee #55BF3B #DF5353 #7798BF #aaeeee'.split(
      ' '
    ),
  chart: {
    backgroundColor: '#fff',
    style: {
      fontFamily: 'Dosis, sans-serif'
    }
  },
  title: {
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      textTransform: 'uppercase'
    }
  },
  tooltip: {
    borderWidth: 0,
    backgroundColor: 'rgba(219,219,216,0.8)',
    shadow: !1
  },
  legend: {
    backgroundColor: '#F0F0EA',
    itemStyle: {
      fontWeight: 'bold',
      fontSize: '13px'
    }
  },
  xAxis: {
    gridLineWidth: 1,
    labels: {
      style: {
        fontSize: '12px'
      }
    }
  },
  yAxis: {
    minorTickInterval: 'auto',
    title: {
      style: {
        textTransform: 'uppercase'
      }
    },
    labels: {
      style: {
        fontSize: '12px'
      }
    }
  },
  plotOptions: {
    candlestick: {
      lineColor: '#404048'
    }
  }
};
Highcahrts.setOptions(Highcahrts.theme);

const chartOptions = {
  chart: {
    type: 'column'
  },
  title: {
    text: '兴亚数据完整度'
  },
  subtitle: {
    text: '----2021年度'
  },
  xAxis: {
    categories: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: '申报数量 (票)'
    },
    stackLabels: {
      enabled: true,
      rotation: 60,
      x: 24,
      y: -30,
      style: {
        fontWeight: 'bold',
        color: 'gray'
      },
      formatter: function () {
        if (this.total !== 0) {
          return this.total;
        }
      }
    }
  },
  legend: {
    align: 'right',
    x: 2,
    verticalAlign: 'top',
    y: 13,
    floating: true,
    backgroundColor: 'white',
    borderColor: '#CCC',
    borderWidth: 1,
    shadow: false
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y} 票</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      dataLabels: {
        overflow: 'justify',
        allowOverlap: true,
        crop: false,
        enabled: true,
        rotation: 60,
        color: 'white',
        style: {
          textOutline: '1px 2px black'
        },
        formatter: function () {
          if (this.y !== 0) {
            return this.y;
          }
        }
      }
    }
  },
  series: [
    {
      name: '兴亚-缺失详情',
      data: [null, null, null, null, null, null, 3673, 396, 585, 585, 0, 0],
      stack: 'xy-d',
      color: '#6e0302'
    },
    {
      name: '兴亚-已获取详情',
      data: [0, 0, 0, 0, 0, 0, 23059, 27895, 32283, 37743, 0, 0],
      stack: 'xy-d'
    },
    {
      name: '兴亚-缺失回执',
      data: [0, 0, 0, 0, 0, 0, 967, 2, 6, 6, 0, 0],
      stack: 'xy-r',
      color: '#8e0302'
    },
    {
      name: '兴亚-已获取回执',
      data: [0, 0, 0, 0, 0, 0, 25765, 28289, 32862, 38322, 0, 0],
      stack: 'xy-r'
    }
  ]
};

export function getOptions(title: string, subTitle: string, series: any[]) {
  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: '兴亚数据完整度'
    },
    subtitle: {
      text: '----2021年度'
    },
    xAxis: {
      categories: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: '申报数量 (票)'
      },
      stackLabels: {
        enabled: true,
        rotation: 60,
        x: 24,
        y: -30,
        style: {
          fontWeight: 'bold',
          color: 'gray'
        },
        formatter: function () {
          if (this.total !== 0) {
            return this.total;
          }
        }
      }
    },
    legend: {
      align: 'right',
      x: 2,
      verticalAlign: 'top',
      y: 13,
      floating: true,
      backgroundColor: 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} 票</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          overflow: 'justify',
          allowOverlap: true,
          crop: false,
          enabled: true,
          rotation: 60,
          color: 'white',
          style: {
            textOutline: '1px 2px black'
          },
          formatter: function () {
            if (this.y !== 0) {
              return this.y;
            }
          }
        }
      }
    },
    series: [
      {
        name: '兴亚-缺失详情',
        data: [null, null, null, null, null, null, 3673, 396, 585, 585, 0, 0],
        stack: 'xy-d',
        color: '#6e0302'
      },
      {
        name: '兴亚-已获取详情',
        data: [0, 0, 0, 0, 0, 0, 23059, 27895, 32283, 37743, 0, 0],
        stack: 'xy-d'
      },
      {
        name: '兴亚-缺失回执',
        data: [0, 0, 0, 0, 0, 0, 967, 2, 6, 6, 0, 0],
        stack: 'xy-r',
        color: '#8e0302'
      },
      {
        name: '兴亚-已获取回执',
        data: [0, 0, 0, 0, 0, 0, 25765, 28289, 32862, 38322, 0, 0],
        stack: 'xy-r'
      },
      {
        type: 'pie',
        name: '总的消耗',
        data: [
          {
            name: '小张',
            y: 13
          },
          {
            name: '小潘',
            y: 23
          },
          {
            name: '小王',
            y: 19
          }
        ],
        center: [100, 80],
        size: 100,
        showInLegend: false,
        dataLabels: {
          enabled: false
        }
      }
    ]
  };
  options.title.text = title;
  options.subtitle.text = subTitle;
  options.series = series;
  return options;
}

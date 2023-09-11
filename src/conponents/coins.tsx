import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { coinsList } from '../common/coins-list';
import { getAxiosConfig } from '../api';
import { ICoinCandlesStat } from '../types';
import Chart from "react-apexcharts";
import { getOHLCdata } from '../utilz';

const Coins = () => {
  const date = new Date()
  const category = 'linear'
  const interval = '240'
  const start = date.setDate(date.getDate() - 14)
  const end = Date.now() 

  console.log('start', start)
  console.log('end', end)

  const [candlesData, setCandlesData] = useState<ICoinCandlesStat[]>([])

  useEffect(() => {
    coinsList.forEach(coin => {
      axios(getAxiosConfig(category, coin, interval, start, end))
      .then((response) => {
        const res = response.data as unknown as ICoinCandlesStat

        if (!candlesData.some(i => i.result.symbol === coin) && res.retCode === 0) {
          setCandlesData((prev) => [...prev || [], res])
        }
      })
      .catch((error) => {
        console.log(error);
      });
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('candlesData1', candlesData)

  return (
    <div>
      <h2>Coins</h2>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 10}}>
        {
          candlesData?.map(item => {
            return (
              <div style={{width: '320px', border: 'solid 1px black'}}>
                <h3 style={{paddingLeft: 10}}>{item.result.symbol}</h3>
                <Chart
                  key={item.result.symbol}
                  width="300"
                  type='candlestick'
                  options={{
                    chart: {
                      id: item.result.symbol,
                      sparkline: {enabled: true},
                      animations: {enabled: false},
                    },
                  }}
                  series={[{data: getOHLCdata(item.result.list)}]}
                  stro
                />
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Coins;
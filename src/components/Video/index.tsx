import React, { useEffect, useState } from 'react';
import { Card, Descriptions } from 'antd';
import { Player, BigPlayButton, LoadingSpinner } from 'video-react';
import 'video-react/dist/video-react.css'; // import css
import styles from './index.less';

interface videoInfo {
  name?: string;
  shotName?: string;
  shotTime?: string;
}

const threshold = [0.01]; // 这是触发时机 0.01代表出现 1%的面积出现在可视区触发一次回掉函数 threshold = [0, 0.25, 0.5, 0.75]  表示分别在0% 25% 50% 75% 时触发回掉函数

export default ({
  title,
  url,
  poster,
  videoInfo,
}: {
  title: string;
  url: string;
  poster?: string;
  videoInfo?: videoInfo;
}) => {
  const classRandom = `player-${Math.ceil(Math.random() * 10000)}`;
  const [isShow, setIsShow] = useState(false);

  // 利用 IntersectionObserver 监听元素是否出现在视口
  const lazyload = new IntersectionObserver(
    (entries) => {
      // 观察者
      entries.forEach((item) => {
        // entries 是被监听的元素集合它是一个数组
        if (item.intersectionRatio <= 0) return; // intersectionRatio 是可见度 如果当前元素不可见就结束该函数。
        setIsShow(true);
      });
    },
    {
      threshold, // 添加触发时机数组
    },
  );

  useEffect(() => {
    const playerDom = document.querySelector(`.${classRandom}`);
    lazyload.observe(playerDom?.children[0]); // 添加需要被观察的元素。
    return () => {
      setIsShow(true);
      lazyload.disconnect(); // 填充完 img 的 src 属性后取消监听。
    };
  }, [lazyload]);

  return (
    <div>
      <Card headStyle={{ padding: 0 }} bodyStyle={{ padding: 0 }} bordered={false} title={title}>
        <Player poster={poster} className={`${classRandom}`}>
          {isShow && <source src={url} />}
          <BigPlayButton className="playBtn" position="center" />
          <LoadingSpinner />
        </Player>
      </Card>
      {videoInfo && (
        <Descriptions bordered size="small" column={{ xxl: 3, xl: 3, lg: 3, md: 1, sm: 1, xs: 1 }}>
          <Descriptions.Item className={styles.descItem} label="老师">
            {videoInfo.name || '刘建成'}
          </Descriptions.Item>
          <Descriptions.Item className={styles.descItem} label="拍摄">
            {videoInfo.shotName || '-'}
          </Descriptions.Item>
          <Descriptions.Item className={styles.descItem} label="拍摄时间">
            {videoInfo.shotTime || '-'}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};

import React from 'react';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

export function useZhCn(children) {
  return (
    <LocaleProvider locale={zhCN}>
      {children}
    </LocaleProvider>
  );
}

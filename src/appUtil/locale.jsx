import React from 'react';
import {LocaleProvider} from 'antd';

export function applyLanguage(type) {
  let language = '';
  if (type.toUpperCase() === 'ZH_CN') {
    import('moment/locale/zh-cn');
    language = import('antd/lib/locale-provider/zh_CN');
  }
  return children => <LocaleProvider locale={language}>{children}</LocaleProvider>;
}

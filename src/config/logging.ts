const DEFAULT_NAMESPACE = 'Client';

const createLog = (
  level: 'INFO' | 'WARN' | 'ERROR',
  message: any,
  namespace = DEFAULT_NAMESPACE
) => {
  let levelColor = 'inherit';
  if (level === 'INFO') levelColor = '#00bcd4';
  else if (level === 'WARN') levelColor = '#ff9800';
  else if (level === 'ERROR') levelColor = '#f44336';

  const dateStyle = 'color: inherit';
  const namespaceStyle = 'color: #61DBFB';
  const levelStyle = `color: ${levelColor}`;
  const messageStyle = 'color: inherit';

  if (typeof message === 'string')
    return [
      `%c[${getDate()}] %c[${namespace}] %c[${level}] %c${message}`,
      dateStyle,
      namespaceStyle,
      levelStyle,
      messageStyle,
    ];

  return [
    `%c[${getDate()}] %c[${namespace}] %c[${level}]`,
    dateStyle,
    namespaceStyle,
    levelStyle,
    message,
  ];
};

const info = (message: any, useNative = false) => {
  if (useNative) console.info(...createLog('INFO', message));
  else console.log(...createLog('INFO', message));
};

const warn = (message: any, useNative = false) => {
  if (useNative) console.warn(...createLog('WARN', message));
  else console.log(...createLog('WARN', message));
};

const error = (message: any, useNative = false) => {
  if (useNative) console.error(...createLog('ERROR', message));
  else console.log(...createLog('ERROR', message));
};

const getDate = () => {
  return new Date().toISOString();
};

const logging = { info, warn, error };

export default logging;

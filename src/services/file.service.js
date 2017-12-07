const request = require('superagent');
const config = require('../config');
const OSS = require('ali-oss');
const fs = require('fs');
const co = require('co');

const PREFIX = '/blog/';

/**
 * 获取oss远程地址
 * @param {string} url 目标url 
 */
function createOSSUrl(url = '') {
  return `${PREFIX}${url.replace(/^\//, '')}`;
}

/**
 * @class FileService 定义 file system 的接口
 */
class FileService {
  constructor() {
    this.oss = new OSS({
      bucket: config.env['OSS']['BUCKET'],
      region: config.env['OSS']['REGION'],
      accessKeyId: config.env['OSS']['ACCESS_KEY_ID'],
      accessKeySecret: config.env['OSS']['ACCESS_KEY_SECRET']
    });
  }

  /**
   * 获取目标文件
   * @param {string} url 
   */
  async get(url) {
    const result = await co(this.oss.getStream(createOSSUrl(url)));
    return result.stream;
  }

  /**
   * 上传
   * @param {string} url 上传的远程地址
   * @param {string} local 本地临时文件地址
   */
  async upload(url, local) {
    return co(this.oss.put(createOSSUrl(url), local));
  }

  /**
   * 获取头像文件
   * @param {string} url 
   */
  async avatar(url) {
    const result = await co(this.oss.getStream(`${createOSSUrl(url)}?x-oss-process=image/resize,m_fixed,h_100,w_100`));
    return result.stream;
  }
}

module.exports = new FileService();
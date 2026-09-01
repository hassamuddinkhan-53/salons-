/**
 * Preload this before Next/webpack on FAT32/exFAT Windows volumes.
 * Node's fs.readlink() throws EISDIR for ordinary files there, which
 * webpack treats as fatal. Remap to EINVAL ("not a symlink").
 */
const fs = require("node:fs");

function remap(err) {
  if (err && err.code === "EISDIR") {
    err.code = "EINVAL";
  }
  return err;
}

const readlink = fs.readlink.bind(fs);
const readlinkSync = fs.readlinkSync.bind(fs);

function patchedReadlink(path, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }
  return readlink(path, options, (err, link) => {
    callback(remap(err), link);
  });
}

function patchedReadlinkSync(path, options) {
  try {
    return readlinkSync(path, options);
  } catch (err) {
    throw remap(err);
  }
}

fs.readlink = patchedReadlink;
fs.readlinkSync = patchedReadlinkSync;

if (fs.promises?.readlink) {
  const promiseReadlink = fs.promises.readlink.bind(fs.promises);
  fs.promises.readlink = async (path, options) => {
    try {
      return await promiseReadlink(path, options);
    } catch (err) {
      throw remap(err);
    }
  };
}

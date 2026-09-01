import fs from "node:fs";
import type { NextConfig } from "next";

/**
 * FAT32/exFAT volumes on Windows make Node's fs.readlink() throw EISDIR
 * for ordinary files. Webpack treats that as fatal. Remap to EINVAL so
 * webpack correctly treats the path as "not a symlink".
 * Harmless on NTFS.
 */
function remapEisdir(err: NodeJS.ErrnoException | null) {
  if (err && err.code === "EISDIR") {
    err.code = "EINVAL";
  }
  return err;
}

const originalReadlink = fs.readlink.bind(fs) as typeof fs.readlink;
const originalReadlinkSync = fs.readlinkSync.bind(fs);

fs.readlink = ((
  path: fs.PathLike,
  options: any,
  callback?: (err: NodeJS.ErrnoException | null, link: string | Buffer) => void,
) => {
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }
  originalReadlink(path, options as fs.EncodingOption, (err, link) => {
    callback?.(remapEisdir(err), link);
  });
}) as typeof fs.readlink;

fs.readlinkSync = ((path: fs.PathLike, options?: fs.EncodingOption) => {
  try {
    return originalReadlinkSync(path, options);
  } catch (err) {
    throw remapEisdir(err as NodeJS.ErrnoException);
  }
}) as typeof fs.readlinkSync;

const originalPromisesReadlink = fs.promises.readlink.bind(fs.promises);
fs.promises.readlink = (async (path: fs.PathLike, options?: fs.EncodingOption) => {
  try {
    return await originalPromisesReadlink(path, options);
  } catch (err) {
    throw remapEisdir(err as NodeJS.ErrnoException);
  }
}) as typeof fs.promises.readlink;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [],
  },
  webpack: (config) => {
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;


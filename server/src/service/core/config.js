import config from 'config';
import path from 'path';

const authConfigDir = path.join('./config', 'auth');
const authConfig = config.util.loadFileConfigs(authConfigDir)
config.util.setModuleDefaults('auth', authConfig)

var configService = config;

export { configService };

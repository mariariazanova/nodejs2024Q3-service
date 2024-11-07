import { INestApplication } from '@nestjs/common';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { parse } from 'yaml';

const getSwaggerConfig = async (app: INestApplication<any>) => {
  const rootDir = dirname(__dirname);
  console.log(rootDir);
  const yamlPath = join(rootDir, '..', 'doc', 'api.yaml');
  const yamlDocument: OpenAPIObject = parse(readFileSync(yamlPath, 'utf8'));

  return SwaggerModule.setup('doc', app, yamlDocument);
};

export default getSwaggerConfig;

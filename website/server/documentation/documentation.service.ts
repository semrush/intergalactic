import { join } from 'path';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Interface } from './documentation.interface';
import { Type } from './documentation.type';
import { normalizeDocumentalistContents } from '../utils';
import { ITypescriptPluginData } from 'documentalist';

@Injectable()
export class DocumentationService implements OnModuleInit {
  private interfaces: Interface[] = [];
  private types: Type[] = [];

  onModuleInit() {
    const waitProcessingTS = () => {
      try {
        const { typescript } = require(join(process.cwd(), 'ts.json'));
        this.addInterface(typescript);
      } catch (e) {
        setTimeout(() => {
          waitProcessingTS();
        }, 5000);
      }
    };

    waitProcessingTS();
  }

  addInterface(typescript: ITypescriptPluginData) {
    Object.values(typescript).forEach((ts) => {
      if (ts.kind === 'interface') {
        this.interfaces.push({
          name: ts.name,
          extends: ts.extends,
          properties: ts.properties.map((prop) => ({
            ...prop,
            documentation: {
              ...prop.documentation,
              contents: prop.documentation
                ? normalizeDocumentalistContents(prop.documentation.contents)
                : [],
            },
          })),
          documentation: {
            ...ts.documentation,
            contents: ts.documentation
              ? normalizeDocumentalistContents(ts.documentation.contents)
              : [],
          },
        });
      }
      if (ts.kind === 'type alias') {
        const { name, type } = ts;
        this.types.push({
          name,
          type,
        });
      }
    });
  }

  findInterfaceByName(name: string) {
    return this.interfaces.find((_interface) => _interface.name === name);
  }

  findTypeByName(name: string) {
    return this.types.find((_type) => _type.name === name);
  }

  getInterfaces() {
    return this.interfaces;
  }

  getTypes() {
    return this.types;
  }
}

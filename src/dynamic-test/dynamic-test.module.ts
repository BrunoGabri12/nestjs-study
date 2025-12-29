import { DynamicModule, Module } from '@nestjs/common';

export interface DynamicTestModule {
  apiKey: string;
  apiSecret: string;
}

export const MY_DYNAMIC_CONFIG = 'MY_DYNAMIC_CONFIG';

@Module({})
export class DynamicTestModule {
  static register(configs: DynamicTestModule): DynamicModule {
    return {
      module: DynamicTestModule,
      imports: [],
      controllers: [],
      providers: [
        {
          provide: MY_DYNAMIC_CONFIG,
          useValue: configs,
        },
      ],
      exports: [],
    };
  }
}

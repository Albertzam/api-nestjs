import { Test, TestingModule } from '@nestjs/testing';
import { CurseController } from './curse.controller';

describe('CurseController', () => {
  let controller: CurseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurseController],
    }).compile();

    controller = module.get<CurseController>(CurseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CurseService } from './curse.service';

describe('CurseService', () => {
  let service: CurseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurseService],
    }).compile();

    service = module.get<CurseService>(CurseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

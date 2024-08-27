import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database..service';

describe('Database', () => {
  let provider: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    provider = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

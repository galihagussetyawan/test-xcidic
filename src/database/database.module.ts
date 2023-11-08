import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'test',
      synchronize: true,
      dropSchema: false,
      logging: false,
      autoLoadEntities: true,
      entities: ['dist/**/*.entity.js'],
    }),
  ],
})
export class DatabaseModule {}

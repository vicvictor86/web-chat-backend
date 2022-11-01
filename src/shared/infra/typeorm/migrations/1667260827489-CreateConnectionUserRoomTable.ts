import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateConnectionUserRoomTable1667260827489 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_rooms',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'user_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'room_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'socket_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'is_on_chat',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'UserInConnection',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'RoomInConnection',
            referencedTableName: 'rooms',
            referencedColumnNames: ['id'],
            columnNames: ['room_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_rooms");
  }

}

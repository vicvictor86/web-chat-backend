import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class CreateNewCollumnsInRooms1671656259122 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('rooms', [
      new TableColumn(
        {
          name: 'is_private',
          type: 'boolean',
          default: false
        }
      ),

      new TableColumn(
        {
          name: 'password',
          type: 'varchar',
          isNullable: true,
        }
      )],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('rooms', ['is_private', 'password']);
  }

}

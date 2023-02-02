import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableAddColumnUserQuantity1675353788287 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('rooms', new TableColumn(
            {
                name: 'user_quantity',
                type: 'integer',
                default: 0
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('rooms', 'user_quantity');
    }

}

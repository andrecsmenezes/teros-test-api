import { Migration } from '@mikro-orm/migrations';

export class Migration20221010004536 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `participant` (`pk_participant` int unsigned not null auto_increment primary key, `organisation_id` varchar(36) not null, `organisation_name` varchar(255) not null, `customer_friendly_logo_uri` varchar(255) not null, `open_id_discovery_document` varchar(255) not null, `created_at` datetime null, `updated_at` datetime null, `deleted_at` datetime null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `user` (`pk_user` int unsigned not null auto_increment primary key, `email` varchar(255) not null, `password` varchar(255) not null, `created_at` datetime null, `updated_at` datetime null, `deleted_at` datetime null) default character set utf8mb4 engine = InnoDB;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `participant`;');

    this.addSql('drop table if exists `user`;');
  }

}

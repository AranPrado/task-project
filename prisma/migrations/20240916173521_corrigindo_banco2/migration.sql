-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_id_fkey`;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

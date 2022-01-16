/*
  Warnings:

  - You are about to drop the `PermissionsOnRoles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PermissionsOnRoles" DROP CONSTRAINT "PermissionsOnRoles_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "PermissionsOnRoles" DROP CONSTRAINT "PermissionsOnRoles_role_id_fkey";

-- DropTable
DROP TABLE "PermissionsOnRoles";

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToRole_AB_unique" ON "_PermissionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `RolesOnPermission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RolesOnPermission" DROP CONSTRAINT "RolesOnPermission_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "RolesOnPermission" DROP CONSTRAINT "RolesOnPermission_role_id_fkey";

-- DropTable
DROP TABLE "RolesOnPermission";

-- CreateTable
CREATE TABLE "PermissionsOnRoles" (
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "PermissionsOnRoles_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- AddForeignKey
ALTER TABLE "PermissionsOnRoles" ADD CONSTRAINT "PermissionsOnRoles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsOnRoles" ADD CONSTRAINT "PermissionsOnRoles_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

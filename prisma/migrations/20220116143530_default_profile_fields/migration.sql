/*
  Warnings:

  - Made the column `IGN` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "IGN" SET NOT NULL,
ALTER COLUMN "coins" SET DEFAULT 0.0,
ALTER COLUMN "attendance_points" SET DEFAULT 0.0,
ALTER COLUMN "violations" SET DEFAULT 0.0,
ALTER COLUMN "bonuses" SET DEFAULT 0.0;

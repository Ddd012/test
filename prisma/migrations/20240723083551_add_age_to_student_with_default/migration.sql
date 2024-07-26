ALTER TABLE "Student" ADD COLUMN "age" INTEGER NOT NULL DEFAULT 18;

-- 为现有行设置默认值
UPDATE "Student" SET "age" = 18 WHERE "age" IS NULL;
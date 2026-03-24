-- CreateTable
CREATE TABLE "GradeComponent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "GradeComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradeGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "tempId" INTEGER NOT NULL,

    CONSTRAINT "GradeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,
    "shareCode" TEXT NOT NULL,

    CONSTRAINT "CourseTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseTemplate_name_key" ON "CourseTemplate"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CourseTemplate_code_key" ON "CourseTemplate"("code");

-- AddForeignKey
ALTER TABLE "GradeComponent" ADD CONSTRAINT "GradeComponent_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "GradeGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradeGroup" ADD CONSTRAINT "GradeGroup_tempId_fkey" FOREIGN KEY ("tempId") REFERENCES "CourseTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

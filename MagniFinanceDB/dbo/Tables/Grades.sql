CREATE TABLE [dbo].[Grades] (
    [StudentId]  INT          NOT NULL,
    [SubjectId]  INT          NOT NULL,
    [GradeValue] DECIMAL (18) NULL,
    PRIMARY KEY CLUSTERED ([StudentId] ASC, [SubjectId] ASC),
    CONSTRAINT [FK_Grade_Student] FOREIGN KEY ([StudentId]) REFERENCES [dbo].[Students] ([Id]),
    CONSTRAINT [FK_Grade_Subject] FOREIGN KEY ([SubjectId]) REFERENCES [dbo].[Subjects] ([Id])
);


CREATE TABLE [dbo].[Subjects] (
    [Id]           INT         IDENTITY (1, 1) NOT NULL,
    [Name]         NCHAR (255) NULL,
    [Fk_CourseId]  INT         NULL,
    [Fk_TeacherId] INT         NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Subjects_Course] FOREIGN KEY ([Fk_CourseId]) REFERENCES [dbo].[Courses] ([Id]),
    CONSTRAINT [FK_Subjects_Teacher] FOREIGN KEY ([Fk_TeacherId]) REFERENCES [dbo].[Teachers] ([Id])
);


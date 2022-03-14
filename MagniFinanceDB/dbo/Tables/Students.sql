CREATE TABLE [dbo].[Students] (
    [Id]         INT         IDENTITY (1, 1) NOT NULL,
    [Name]       NCHAR (255) NULL,
    [Birthday]   DATETIME    NULL,
    [Reg_number] NCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


CREATE TABLE [dbo].[Teachers] (
    [Id]       INT          IDENTITY (1, 1) NOT NULL,
    [Name]     NCHAR (255)  NULL,
    [Birthday] DATETIME     NULL,
    [Salary]   DECIMAL (18) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


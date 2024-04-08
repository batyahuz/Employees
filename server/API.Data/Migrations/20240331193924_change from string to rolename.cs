using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Solid.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeFromStringToRoleName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Team_TeamId",
                table: "Employees");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Team",
                table: "Team");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Roles");

            migrationBuilder.RenameTable(
                name: "Team",
                newName: "Teams");

            migrationBuilder.AddColumn<int>(
                name: "NameId",
                table: "Roles",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Teams",
                table: "Teams",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_NameId",
                table: "Roles",
                column: "NameId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Teams_TeamId",
                table: "Employees",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_RoleNames_NameId",
                table: "Roles",
                column: "NameId",
                principalTable: "RoleNames",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Teams_TeamId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Roles_RoleNames_NameId",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Roles_NameId",
                table: "Roles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Teams",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "NameId",
                table: "Roles");

            migrationBuilder.RenameTable(
                name: "Teams",
                newName: "Team");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Roles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Team",
                table: "Team",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Team_TeamId",
                table: "Employees",
                column: "TeamId",
                principalTable: "Team",
                principalColumn: "Id");
        }
    }
}

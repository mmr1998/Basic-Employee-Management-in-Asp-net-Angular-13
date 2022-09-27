using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using EmployeeAPI.Models;

namespace EmployeeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public EmployeeController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select EmployeeId,EmployeeName,
                            Department, convert(varchar(10),DateOfJoin,120) as DateOfJoin,
                            ProfilePicture,Status from dbo.Employee";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EmployeeConn");

            SqlDataReader myReader;

            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myConn.Close();
                }
            }

            return new JsonResult(table);

        }

        [HttpPost]
        public JsonResult Post(Employee value)
        {
            string query = @"insert into dbo.Employee
                            (EmployeeName,Department,DateOfJoin,ProfilePicture,Status)
                            values (
                            '" + value.EmployeeName + @"',
                            '" + value.Department + @"',
                            '" + value.DateOfJoin + @"',
                            '" + value.ProfilePicture + @"',
                            '" + value.Status + @"'
                            )";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EmployeeConn");

            SqlDataReader myReader;

            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myConn.Close();
                }
            }

            return new JsonResult("Inserted Successfully!");
        }

        [HttpPut]
        public JsonResult Put(Employee value)
        {
            string query = @"update  dbo.Employee set 
                            EmployeeName = '" + value.EmployeeName + @"',
                            Department = '" + value.Department + @"',
                            DateOfJoin = '" + value.DateOfJoin + @"',
                            ProfilePicture = '" + value.ProfilePicture + @"',
                            Status = '" + value.Status + @"'
                            where EmployeeId = " + value.EmployeeId + "";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EmployeeConn");

            SqlDataReader myReader;

            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myConn.Close();
                }
            }

            return new JsonResult("Updated Successfully!");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from  dbo.Employee 
                            where EmployeeId = " + id + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EmployeeConn");

            SqlDataReader myReader;

            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myConn.Close();
                }
            }

            return new JsonResult("Deleted Successfully!");
        }

        [Route("SaveFile")]
        [HttpPost]

        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + fileName;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(fileName);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }

        [HttpGet]
        [Route("GetDepartmentNames")]
        public JsonResult GetDepartmentNames()
        {
            string query = @"select DepartmentName from dbo.Department";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EmployeeConn");

            SqlDataReader myReader;

            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myConn.Close();
                }
            }

            return new JsonResult(table);

        }
    }
}

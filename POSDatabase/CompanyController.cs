using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using CompanyApi.Model;
using CompanyApi.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CompanyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyRepository _dbRepository;

        public CompanyController(ICompanyRepository dbRepository)
        {
            _dbRepository = dbRepository;
        }

        // GET: api/Company
        [HttpGet]
        public IActionResult Get()
        {
            var companies = _dbRepository.GetCompanies().OrderBy(company => company.CompanyId);
            if (companies == null)
            {
                return new OkObjectResult("Company Information not found");
            }
            return new OkObjectResult(companies);
        }

        // GET: api/Company/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var company = _dbRepository.GetCompanyByID(id);
            if (company == null)
            {
                return new OkObjectResult("Company Information not found for id : " + id);
            }
            return new OkObjectResult(company);
        }

        // POST: api/Company
        [HttpPost]
        public IActionResult Post([FromBody] Company company)
        {
            using (var scope = new TransactionScope())
            {
                _dbRepository.CreateCompany(company);
                scope.Complete();
                return CreatedAtAction(nameof(Get), new { id = company.CompanyId }, company);
            }
        }

        // PUT: api/Company/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

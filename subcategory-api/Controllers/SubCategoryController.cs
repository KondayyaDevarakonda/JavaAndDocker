using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using subcategoryapi;
using subcategoryapi.Repository;

namespace subcategory_api.Controllers
{
    
    [Route("api/subcategories")]
    [ApiController]
    public class SubCategoryController : ControllerBase
    {
        private readonly ISubCategoryRepository _subCategoryRepository;

        public SubCategoryController(ISubCategoryRepository subCategoryRepository)
        {
            _subCategoryRepository = subCategoryRepository;
        }

        // GET: api/SubCategory
        //[EnableCors]
        [HttpGet]
        public IActionResult Get()
        {
            var subCategories = _subCategoryRepository.GetSubCategories().OrderBy(subCatg => subCatg.SubCategoryId);
            return new OkObjectResult(subCategories);
        }

        // GET: api/SubCategory/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var category = _subCategoryRepository.GetSubCategoryByID(id);
            return new OkObjectResult(category);
        }

        // POST: api/SubCategory
        [HttpPost]
        public IActionResult Post([FromBody] SubCategory subCategory)
        {
            using (var scope = new TransactionScope())
            {
                _subCategoryRepository.CreateSubCategory(subCategory);
                scope.Complete();
                return CreatedAtAction(nameof(Get), new { id = subCategory.SubCategoryId }, subCategory);
            }
        }

        // PUT: api/SubCategory/5
        [HttpPut]
        public IActionResult Put([FromBody] SubCategory subCategory)
        {
            if (subCategory != null)
            {
                using (var scope = new TransactionScope())
                {
                    _subCategoryRepository.UpdateSubCategory(subCategory);
                    scope.Complete();
                    return new OkResult();
                }
            }
            return new NoContentResult();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _subCategoryRepository.DeleteSubCategory(id);
            return new OkResult();
        }
    }
}

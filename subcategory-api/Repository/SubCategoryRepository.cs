using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace subcategoryapi.Repository
{
    public class SubCategoryRepository : ISubCategoryRepository
    {
        private readonly SubCategoryDBContext _dbContext;

        public SubCategoryRepository(SubCategoryDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<SubCategory> GetSubCategories()
        {
            return _dbContext.SubCategory.ToList();
        }

        public SubCategory GetSubCategoryByID(int subCategoryId)
        {
            return _dbContext.SubCategory.ToList().Where(a => a.SubCategoryId == subCategoryId).FirstOrDefault();
        }

        public void CreateSubCategory(SubCategory subCategory)
        {
            subCategory.CreatedBy = 1;
            subCategory.CreatedDate = DateTime.Now;
            _dbContext.Add(subCategory);
            Save();
        }

        public void UpdateSubCategory(SubCategory subCategory)
        {
            //var subcategory = _dbContext.SubCategory.ToList().Where(a => a.SubCategoryId == subCategory.SubCategoryId).FirstOrDefault(); ;
            //_dbContext.Entry(subCategory).State = EntityState.Modified;


            _dbContext.Update(subCategory).Property(x => x.SubCategoryId).IsModified = false;
            Save();
        }

        public void DeleteSubCategory(int subCategoryId)
        {
            var subcategory = _dbContext.SubCategory.ToList().Where(a => a.SubCategoryId == subCategoryId).FirstOrDefault(); ;
            _dbContext.SubCategory.Remove(subcategory);
            Save();
        }        

        public void Save()
        {
            _dbContext.SaveChanges();
        }
        
    }
}

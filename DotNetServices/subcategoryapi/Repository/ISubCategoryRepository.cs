using subcategoryapi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace subcategoryapi.Repository
{
    public interface ISubCategoryRepository
    {
        IEnumerable<SubCategory> GetSubCategories();
        SubCategory GetSubCategoryByID(int subCategoryId);
        void CreateSubCategory(SubCategory subCategory);
        void UpdateSubCategory(SubCategory subCategory);
        void DeleteSubCategory(int subCategoryId);
        void Save();
    }
}

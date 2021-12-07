using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace LinkCollectionApp.Controllers
{
  [Route("api/public")]
  [ApiController]
  public class PublicCollectionsController : Controller
  {
    private readonly ApplicationDbContext _dbContext;
    private readonly IUserContextProvider _userContextProvider;
    private readonly IRequestInfoService _requestInfoService;
    private readonly IMemoryCache _cache;

    public PublicCollectionsController(
      ApplicationDbContext dbContext, 
      IRequestInfoService requestInfoService, 
      IUserContextProvider userContextProvider, 
      IMemoryCache cache)
    {
      _dbContext = dbContext;
      _requestInfoService = requestInfoService;
      _userContextProvider = userContextProvider;
      _cache = cache;
    }

    [HttpGet("{id}")]
    public ActionResult<Collection> GetPublicCollection(int id)
    {
      var collection = _dbContext.Collection
        .Include(c => c.Elements)
        .SingleOrDefault(c => c.Id == id);
      if (collection == null || collection.IsPublic != true)
        return NotFound();

      return collection;
    }
  }
}

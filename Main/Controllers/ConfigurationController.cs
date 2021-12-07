using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.DTO;
using LinkCollectionApp.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace LinkCollectionApp.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ConfigurationController : ControllerBase
  {
    private readonly ApplicationDbContext _dbContext;
    private readonly ICollectionConfigurationProvider _configurationProvider;
    private readonly IUserContextProvider _userProvider;

    public ConfigurationController(
      ApplicationDbContext dbContext, 
      ICollectionConfigurationProvider configurationProvider, 
      IUserContextProvider userProvider)
    {
      _dbContext = dbContext;
      _configurationProvider = configurationProvider;
      _userProvider = userProvider;
    }

    [Authorize]
    [HttpGet("spotifyclientid")]
    public ActionResult<string> GetSpotifyClientId()
    {
      var entry = _dbContext.Configuration.SingleOrDefault(c => c.Key == "SpotifyClientId");
      if (entry == null)
        return NotFound();
      return entry.Value;
    }
  }
}

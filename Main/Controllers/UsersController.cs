using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models;
using LinkCollectionApp.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LinkCollectionApp.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly ApplicationDbContext _dbContext;
    private readonly IUserContextProvider _userContextProvider;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public UsersController(
      IUserContextProvider userContextProvider, 
      ApplicationDbContext dbContext, 
      UserManager<ApplicationUser> userManager, 
      RoleManager<IdentityRole> roleManager)
    {
      _userContextProvider = userContextProvider;
      _dbContext = dbContext;
      _userManager = userManager;
      _roleManager = roleManager;
    }

    [HttpGet("me")]
    public async Task<UserDTO> GetCurrentUser()
    {
      var user = await _userManager.FindByIdAsync(_userContextProvider.GetCurrentUserId());

      var roles = await _userManager.GetRolesAsync(user);

      return UserDtoBuilder
        .FromApplicationUser(user)
        .WithRoles(roles)
        .Create();
    }


    [HttpGet]
    public List<UserDTO> GetUsers()
    {
      var users = _dbContext.ApplicationUser;
      return users.Select(user => 
        UserDtoBuilder
          .FromApplicationUser(user)
          .IncludeLockoutInfo()
          .Create())
        .ToList();
    }
  }
}

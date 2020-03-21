﻿using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace LinkCollectionApp.Areas.Identity.Data
{
  public class IdentityContext : ApiAuthorizationDbContext<User>
  {
    public IdentityContext(
      DbContextOptions options,
      IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
    {
    }
  }
}

using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using YeMigbeKeeper.Utils;
using YeMigbeKeeper.Models;
using Microsoft.Data.SqlClient;


namespace YeMigbeKeeper.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }
        public User GetByFireBaseUserId(string fireBaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FireBaseUserId, u.FirstName, u.LastName, u.DisplayName, 
                               u.Email
                          FROM [User] u
                         WHERE FireBaseUserId = @FireBaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", fireBaseUserId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [User] (FirstName, LastName, DisplayName, Email, FireBaseUserId)
                        OUTPUT INSERTED.ID
                        VALUES (@FirstName, @LastName, @DisplayName, @Email, @FireBaseUserId)";

                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@FireBaseUserId", user.FireBaseUserId);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<User> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT u.Id, u.FirstName, u.LastName, u.DisplayName, u.Email, u.FireBaseUserId
			                        From [User] u";

                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();
                    while (reader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                        });
                    }

                    reader.Close();

                    return users;
                }
            }
        }

        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT u.Id, u.FirstName, u.LastName, u.DisplayName, u.Email, u.FireBaseUserId
			                        From [User] u
                        where u.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    User user = null;
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = id,
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }
    }
}

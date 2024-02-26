
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/": {
        "get": {
          "operationId": "AppController_getHello",
          "parameters": [],
          "responses": {
            "default": {
              "description": "default endpoint"
            }
          },
          "tags": [
            "Hello!"
          ]
        }
      },
      "/news": {
        "get": {
          "operationId": "NewsController_getNews",
          "summary": "Get all news",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Return all news",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/News"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "news"
          ]
        },
        "post": {
          "operationId": "NewsController_createNews",
          "summary": "Create news",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateNewsInput"
                }
              }
            }
          },
          "responses": {
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "news"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/news/{id}": {
        "get": {
          "operationId": "NewsController_getNewsById",
          "summary": "Get news by ID",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "News ID",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Return news by ID",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/News"
                  }
                }
              }
            },
            "404": {
              "description": "News not found"
            }
          },
          "tags": [
            "news"
          ]
        },
        "put": {
          "operationId": "NewsController_updateNews",
          "summary": "Update news",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "News ID",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateNewsInput"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "News updated",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/News"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            },
            "404": {
              "description": "News not found"
            }
          },
          "tags": [
            "news"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "NewsController_deleteNews",
          "summary": "Delete news",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "News ID",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "News deleted"
            },
            "404": {
              "description": "News not found"
            }
          },
          "tags": [
            "news"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/news/tag/{tagId}": {
        "get": {
          "operationId": "NewsController_getNewsByTag",
          "summary": "Get news by tag",
          "parameters": [
            {
              "name": "tagId",
              "required": true,
              "in": "path",
              "description": "Tag ID",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Return news by tag",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/News"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "news"
          ]
        }
      },
      "/tags": {
        "get": {
          "operationId": "TagController_getTags",
          "summary": "Get all tags",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Tag"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "tags"
          ]
        },
        "post": {
          "operationId": "TagController_createTag",
          "summary": "Create a new tag",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TagCreateInput"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Tag"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "tags"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/tags/{id}": {
        "put": {
          "operationId": "TagController_updateTag",
          "summary": "Update a tag",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "The id of the tag to update",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TagUpdateInput"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Tag"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            },
            "404": {
              "description": "Tag not found"
            }
          },
          "tags": [
            "tags"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "TagController_deleteTag",
          "summary": "Delete a tag",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "The id of the tag to delete",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "204": {
              "description": ""
            },
            "404": {
              "description": "Tag not found"
            }
          },
          "tags": [
            "tags"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/categories": {
        "get": {
          "operationId": "CategoryController_getCategories",
          "summary": "Get all categories",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Category"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "categories"
          ]
        },
        "post": {
          "operationId": "CategoryController_createCategory",
          "summary": "Create a new category",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CategoryCreateInput"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Category"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "categories"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/categories/{id}": {
        "put": {
          "operationId": "CategoryController_updateCategory",
          "summary": "Update a category",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "The id of the category to update",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CategoryUpdateInput"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Category"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            },
            "404": {
              "description": "Category not found"
            }
          },
          "tags": [
            "categories"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "CategoryController_deleteCategory",
          "summary": "Delete a category",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "The id of the category to delete",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "204": {
              "description": ""
            },
            "404": {
              "description": "Category not found"
            }
          },
          "tags": [
            "categories"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/auth/login": {
        "post": {
          "operationId": "AuthController_login",
          "summary": "Login as an admin",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AdminInput"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Admin logged in successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResponseLogin"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "auth"
          ]
        }
      }
    },
    "info": {
      "title": "News API",
      "description": "The News API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "news",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "Tag": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "The unique identifier of the tag"
            },
            "name": {
              "type": "string",
              "description": "The name of the tag"
            },
            "link": {
              "type": "string",
              "description": "Link to resource"
            },
            "news": {
              "description": "The news associated with this tag",
              "type": "array",
              "items": {
                "type": "array"
              }
            }
          },
          "required": [
            "id",
            "name",
            "link",
            "news"
          ]
        },
        "Category": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "The unique identifier of the category"
            },
            "name": {
              "type": "string",
              "description": "The name of the category"
            },
            "news": {
              "description": "The news associated with this category",
              "items": {
                "type": "array"
              },
              "type": "array"
            }
          },
          "required": [
            "id",
            "name",
            "news"
          ]
        },
        "News": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "example": 1,
              "description": "The unique identifier of the news"
            },
            "title": {
              "type": "string",
              "example": "Breaking News",
              "description": "The title of the news"
            },
            "text": {
              "type": "string",
              "example": "This is the news text.",
              "description": "The text content of the news"
            },
            "viewCount": {
              "type": "number",
              "example": 0,
              "description": "The view count of the news"
            },
            "sources": {
              "example": [
                "source1",
                "source2"
              ],
              "description": "The sources of the news",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "image": {
              "type": "string",
              "example": "image.jpg",
              "description": "The image associated with the news"
            },
            "publicationDate": {
              "format": "date-time",
              "type": "string",
              "example": "2021-12-31T23:59:59Z",
              "description": "The publication date of the news"
            },
            "tags": {
              "description": "The tags associated with the news",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Tag"
              }
            },
            "categories": {
              "description": "The categories associated with the news",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Category"
              }
            }
          },
          "required": [
            "id",
            "title",
            "text",
            "viewCount",
            "sources",
            "image",
            "publicationDate",
            "tags",
            "categories"
          ]
        },
        "CreateNewsInput": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "text": {
              "type": "string"
            },
            "sources": {
              "description": "Array of sources",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "categories": {
              "description": "Array of category IDs",
              "type": "array",
              "items": {
                "type": "number"
              }
            },
            "tags": {
              "description": "Array of tag IDs",
              "type": "array",
              "items": {
                "type": "number"
              }
            },
            "image": {
              "type": "string",
              "format": "binary",
              "description": "Image file"
            }
          },
          "required": [
            "title",
            "text",
            "image"
          ]
        },
        "UpdateNewsInput": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "text": {
              "type": "string"
            },
            "sources": {
              "description": "Array of sources",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "categories": {
              "description": "Array of category IDs",
              "type": "array",
              "items": {
                "type": "number"
              }
            },
            "tags": {
              "description": "Array of tag IDs",
              "type": "array",
              "items": {
                "type": "number"
              }
            },
            "image": {
              "type": "string",
              "format": "binary",
              "description": "Image file"
            }
          },
          "required": [
            "title",
            "text",
            "image"
          ]
        },
        "TagCreateInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name of the tag"
            },
            "link": {
              "type": "string",
              "description": "Link to resource"
            }
          },
          "required": [
            "name",
            "link"
          ]
        },
        "TagUpdateInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name of the tag"
            },
            "link": {
              "type": "string",
              "description": "Link to resource"
            }
          },
          "required": [
            "name",
            "link"
          ]
        },
        "CategoryCreateInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name of the category"
            }
          },
          "required": [
            "name"
          ]
        },
        "CategoryUpdateInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name of the category"
            }
          },
          "required": [
            "name"
          ]
        },
        "AdminInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "string",
              "description": "The name of the admin"
            },
            "password": {
              "type": "string",
              "example": "string",
              "description": "The password of the admin"
            }
          },
          "required": [
            "name",
            "password"
          ]
        },
        "ResponseLogin": {
          "type": "object",
          "properties": {
            "accessToken": {
              "type": "string",
              "description": "JWT token"
            }
          },
          "required": [
            "accessToken"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
